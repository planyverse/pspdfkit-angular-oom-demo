import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import PSPDFKit, {Instance} from "pspdfkit";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PSPDFKit for Web Angular Example';
  instance: Instance | undefined;
  annotationsVisible = true;

  async ngAfterViewInit() {
    this.instance = await PSPDFKit.load({
      // Use the assets directory URL as a base URL. PSPDFKit will download its library assets from here.
      baseUrl: location.protocol + '//' + location.host + '/assets/',
      document: 'document.pdf',
      container: '.pspdfkit-container'
    });
  }

  async setAnnotationsVisibility(targetVisibility: boolean) {
    if (this.instance) {
      const annotations = await this.instance.getAnnotations(0);
      const modifiedAnnotations = annotations.map(a => a.set('noView', !targetVisibility));
      await this.instance.update(modifiedAnnotations);
      this.annotationsVisible = targetVisibility;
    }
  }
}
