import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Button } from 'vellum-lib';
import { SearchDialogComponent } from './search-dialog.component';

@Component({
  selector: 'app-search-posts-field',
  imports: [Button],
  template: `
    <div>
      <vlm-button
        [size]="'sm'"
        [variant]="'outlined'"
        [theme]="'secondary'"
        (clicked)="showDialog()"
      >
        <span class="material-icons-outlined small" preIcon>search</span>
        <span class="text-sm">Search </span>
        <span class="text-[0.5rem] font-light">CTRL+K</span>
      </vlm-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPostsFieldComponent {
  private readonly dialog = inject(Dialog);

  protected showDialog(): void {
    this.dialog.open(SearchDialogComponent, {
      width: '50vw',
      maxWidth: '90vw',
      panelClass: 'search-dialog-panel'
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.showDialog();
    }
  }
}
