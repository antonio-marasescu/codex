import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BlogFilterForm } from '../../../types/content/blog.types';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-blog-search-filter',
  imports: [ReactiveFormsModule, FloatLabel, InputText],
  template: `
    <form novalidate [formGroup]="form()" class="flex flex-col md:flex-row-reverse gap-4">
      <div>
        <p-floatlabel variant="on">
          <input pInputText id="search" formControlName="search" autocomplete="off" />
          <label for="search">Search...</label>
        </p-floatlabel>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogSearchFilterComponent {
  form = input.required<FormGroup<BlogFilterForm>>();
}
