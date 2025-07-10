import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { SearchDialogComponent } from './search-dialog.component';

@Component({
  selector: 'app-search-posts-field',
  imports: [Button],
  template: `
    <div>
      <p-button
        size="small"
        variant="outlined"
        [rounded]="true"
        severity="secondary"
        (onClick)="showDialog()"
      >
        <div class="flex flex-row items-center gap-2">
          <span class="material-icons-outlined small">search</span>
          <span class="text-sm">Search </span>
          <span class="text-[0.5rem] font-light">CTRL+K</span>
        </div>
      </p-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPostsFieldComponent {
  private readonly dialogService = inject(DialogService);

  protected showDialog(): void {
    this.dialogService.open(SearchDialogComponent, {
      header: 'Search for a post',
      width: '50vw',
      closable: true,
      modal: true,
      breakpoints: {
        '768px': '90vw'
      }
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
