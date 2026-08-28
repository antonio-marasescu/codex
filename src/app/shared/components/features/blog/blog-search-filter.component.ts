import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';
import { BlogFilterForm } from '../../../types/content/blog.types';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Input } from 'vellum-lib';

@Component({
  selector: 'app-blog-search-filter',
  imports: [ReactiveFormsModule, Input],
  template: `
    <form novalidate [formGroup]="form()" class="flex flex-col md:flex-row-reverse gap-4">
      <div>
        <vlm-input [id]="'search'" [label]="'Search...'" [(value)]="searchValue" />
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogSearchFilterComponent {
  form = input.required<FormGroup<BlogFilterForm>>();
  protected searchValue = linkedSignal(() => this.form().controls.search.value);

  constructor() {
    effect(() => {
      const control = this.form().controls.search;
      if (control.value !== this.searchValue()) {
        control.setValue(this.searchValue());
      }
    });
  }
}
