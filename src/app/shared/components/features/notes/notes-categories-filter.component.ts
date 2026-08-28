import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal
} from '@angular/core';
import { NoteCategory, NoteFilterForm } from '../../../types/content/note.types';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonToggleGroup, ButtonToggle, Input } from 'vellum-lib';

@Component({
  selector: 'app-notes-categories-filter',
  imports: [ButtonToggleGroup, ButtonToggle, ReactiveFormsModule, Input],
  template: `
    <form novalidate [formGroup]="form()" class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <vlm-button-toggle-group
          [value]="selectedCategoryValue()"
          (selectionChange)="onCategoryChange($event)"
          class="flex-wrap items-center w-full"
        >
          @for (option of filterCategories(); track option.id) {
            <vlm-button-toggle [value]="option.id">
              {{ option.label }}
            </vlm-button-toggle>
          }
        </vlm-button-toggle-group>
      </div>
      <vlm-input [id]="'search'" [label]="'Search...'" [(value)]="searchValue" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesCategoriesFilterComponent {
  form = input.required<FormGroup<NoteFilterForm>>();
  categories = input.required<NoteCategory[]>();

  protected filterCategories = computed(() => {
    const availableCategories = this.categories();
    const allCategories = [NoteCategory.All].concat(availableCategories);
    return allCategories.map(category => ({ id: category, label: category }));
  });

  protected selectedCategoryValue = linkedSignal(() => {
    const value = this.form().controls.selectedCategory.value;
    return value ? [value] : [];
  });

  protected searchValue = linkedSignal(() => this.form().controls.search.value);

  constructor() {
    effect(() => {
      const searchControl = this.form().controls.search;
      if (searchControl.value !== this.searchValue()) {
        searchControl.setValue(this.searchValue());
      }
    });
  }

  protected onCategoryChange(selected: readonly string[]): void {
    const value = selected.length > 0 ? (selected[0] as NoteCategory) : (null as any);
    this.form().controls.selectedCategory.setValue(value);
    this.selectedCategoryValue.set([...selected] as NoteCategory[]);
  }
}
