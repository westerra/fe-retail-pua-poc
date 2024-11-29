import { Component } from '@angular/core';
import { RtcCommunicationService } from '../../communication/rtc-communication.service';
@Component({
  selector: 'bb-rtc-chat-button',
  templateUrl: './rtc-chat-button.component.html',
})
export class RtcChatButtonComponent {
  constructor(private rtcCommunicationService: RtcCommunicationService) {}
  readonly unreadCount$ = this.rtcCommunicationService.unreadCount$;
  readonly chatIconName$ = this.rtcCommunicationService.chatIconName$;
  toggleChatWindow() {
    this.rtcCommunicationService.toggleChatWindow();
  }
}
