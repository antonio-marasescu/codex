import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog-layout',
  imports: [RouterOutlet],
  template: `
    <div class="md:min-w-xl max-w-4xl">
      <router-outlet />
    </div>
  `
})
export default class BlogLayoutComponent {}
