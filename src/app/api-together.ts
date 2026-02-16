import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-multi-fetch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2>Multi-Step API Fetch Example</h2>
      <input [(ngModel)]="id" placeholder="Enter ID" />
      <button (click)="fetchData()">Fetch Data</button>

      <div *ngIf="loading()">Loading...</div>
      <div *ngIf="error()" style="color:red;">Error: {{ error() }}</div>
      <pre *ngIf="data()">{{ data() | json }}</pre>
    </div>
  `
})
export class MultiFetchComponent {
  id = signal<string>('');                 // User input
  data = signal<any>(null);                // Final fetched data
  loading = signal<boolean>(false);
  error = signal<string>('');

  fetchData() {
    if (!this.id().trim()) {
      this.error.set('Please enter an ID');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.data.set(null);

    // Step 1 → Step 2 → Step 3
    from(fetch(`https://jsonplaceholder.typicode.com/posts/${this.id()}`)).pipe(
      mergeMap(res1 => {
        if (!res1.ok) throw new Error('Step 1 failed');
        return from(res1.json());                   // Step 1: parse JSON
      }),
      mergeMap(postData => {
        // Step 2: fetch comments for this post
        return from(fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}/comments`)).pipe(
          mergeMap(res2 => {
            if (!res2.ok) throw new Error('Step 2 failed');
            return from(res2.json());               // Step 2: parse JSON
          }),
          mergeMap(comments => {
            // Step 3: combine post + comments
            return from(Promise.resolve({ post: postData, comments })); // Step 3: wrap in observable
          })
        );
      }),
      catchError(err => {
        this.error.set(err.message);
        this.loading.set(false);
        throw err; // rethrow to stop the stream
      })
    ).subscribe({
      next: finalData => {
        this.data.set(finalData);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}


// Yes, exactly:

// from(fetch(url))
//   .pipe(
//     mergeMap(res => from(res.json())),  // Step 1: parse JSON
//     mergeMap(data => fetch(...)),       // Step 2: another fetch
//     mergeMap(res => from(res.json())),  // Step 3: parse JSON
//     catchError(err => {...})            // If any step throws, handle it
//   )
//   .subscribe({
//     next: value => {...},               // Runs when the final value is ready
//     error: err => {...}                 // Runs if any error happens
//   });


// from(fetch(...)) → converts Promise → Observable.

// .pipe(...) → runs each mergeMap in order, asynchronously, but one at a time for each emitted value.

// catchError → intercepts errors in the whole pipeline.

// .subscribe() → “start listening” to the Observable. Without this, nothing runs.

// Think of subscribe() as “React’s useEffect with a fetch”: the code inside only runs when you actually subscribe.