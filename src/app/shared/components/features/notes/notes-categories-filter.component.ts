import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NoteCategory, NoteFilterForm } from '../../../types/content/note.types';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-notes-categories-filter',
  imports: [SelectButton, ReactiveFormsModule, FloatLabel, InputText],
  template: `
    <form novalidate [formGroup]="form()" class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <p-select-button
          [options]="filterCategories()"
          formControlName="selectedCategory"
          optionLabel="label"
          optionValue="id"
          [unselectable]="true"
          class="flex-wrap items-center w-full"
        ></p-select-button>
      </div>
      <p-floatlabel variant="on">
        <input pInputText id="search" formControlName="search" autocomplete="off" />
        <label for="search">Search...</label>
      </p-floatlabel>
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
}
