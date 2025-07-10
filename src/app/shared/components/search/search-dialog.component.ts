import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { NotePostsService } from '../../services/note-posts.service';
import { BlogPostsService } from '../../services/blog-posts.service';
import { StandardContent } from '../../types/content/content.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { serializeStandardContentPreview, standardContentSort } from '../../utils/content.utils';
import { Ripple } from 'primeng/ripple';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-search-dialog',
  imports: [IconField, InputIcon, InputText, ReactiveFormsModule, Divider, Ripple],
  template: `
    <div class="flex flex-col gap-4">
      <p-iconfield class="w-full">
        <p-inputicon>
          <span class="material-icons-outlined small">search</span>
        </p-inputicon>
        <input
          type="text"
          pInputText
          placeholder="Search"
          variant="outlined"
          class="w-full"
          [formControl]="searchFilterControl"
        />
      </p-iconfield>
      <p-divider />
      <section class="flex flex-col gap-2">
        @for (item of filteredPosts(); track item.slug; let i = $index) {
          <article
            tabindex="0"
            class="w-full flex items-center p-2 gap-4 cursor-pointer hover:bg-primary"
            [class.bg-primary]="selectedIndex() === i"
            (click)="navigateToPost(item)"
            (keydown.enter)="navigateToPost(item)"
            (keydown.space)="navigateToPost(item)"
            pRipple
          >
            <span class="material-icons-outlined">
              {{ item.type === 'blog' ? 'article' : 'note' }}
            </span>
            <h4 class="flex-1">{{ item.title }}</h4>
            <span class="material-icons-outlined">keyboard_return</span>
          </article>
        }
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDialogComponent {
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly router = inject(Router);
  private readonly notePostsService = inject(NotePostsService);
  private readonly blogPostsService = inject(BlogPostsService);
  protected searchFilterControl = new FormControl<string>('', { nonNullable: true });
  protected notePosts = this.notePostsService.getPosts();
  protected blogPosts = this.blogPostsService.getPosts();
  protected selectedIndex = signal<number>(0);

  protected allPosts = computed(() => {
    const notes = this.notePosts();
    const blogs = this.blogPosts();
    return [...notes, ...blogs] as StandardContent[];
  });
  protected searchFilter = toSignal(
    this.searchFilterControl.valueChanges.pipe(startWith(this.searchFilterControl.value)),
    { initialValue: this.searchFilterControl.value }
  );
  protected filteredPosts = computed(() => {
    const filter = this.searchFilter();
    const allPosts = this.allPosts();
    if (!filter) {
      return this.minimizeResult(allPosts);
    }
    const filteredPosts = [...allPosts].filter(p =>
      serializeStandardContentPreview(p).includes(filter.toLowerCase())
    );
    return this.minimizeResult(filteredPosts);
  });

  private minimizeResult(items: StandardContent[]): StandardContent[] {
    return items.sort(standardContentSort).slice(0, 5);
  }

  @HostListener('keydown', ['$event'])
  protected handleKeydown(event: KeyboardEvent): void {
    const posts = this.filteredPosts();
    if (posts.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.set(Math.min(this.selectedIndex() + 1, posts.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.set(Math.max(this.selectedIndex() - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        const selectedPost = posts[this.selectedIndex()];
        if (selectedPost) {
          this.navigateToPost(selectedPost);
        }
        break;
    }
  }

  protected async navigateToPost(post: StandardContent): Promise<void> {
    const rootPath = post.type === 'blog' ? 'blog' : 'notes';
    await this.router.navigate([rootPath, post.slug]);
    this.dialogRef.close();
  }
}
