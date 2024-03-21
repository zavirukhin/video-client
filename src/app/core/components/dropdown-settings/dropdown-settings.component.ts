import { Component } from '@angular/core';
import { VideoContentService } from 'src/app/youtube/services/video-content.service';

@Component({
  selector: 'app-dropdown-settings',
  templateUrl: './dropdown-settings.component.html',
  styleUrls: ['./dropdown-settings.component.scss'],
})
export class DropdownSettingsComponent {
  constructor(public videoContentService: VideoContentService) {}
}
