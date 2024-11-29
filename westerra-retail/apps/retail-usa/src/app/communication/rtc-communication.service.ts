import { Injectable } from '@angular/core';
import {
  ChatButtonState,
  RtcCommunicationService as RtcCommunicationServiceAPI,
} from '@backbase/real-time-communication-journey-ang';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RtcCommunicationService implements RtcCommunicationServiceAPI {
  private isChatWindowOpened = false;

  private _chatWindowStateChangeEvent$$ = new BehaviorSubject(false);

  get chatWindowStateChangeEvent$() {
    return this._chatWindowStateChangeEvent$$.asObservable();
  }
  private chatIconName$$ = new BehaviorSubject<string>(ChatButtonState.Collapse);
  readonly chatIconName$ = this.chatIconName$$.asObservable();
  private unreadCount$$ = new BehaviorSubject<number>(0);
  readonly unreadCount$ = this.unreadCount$$.asObservable();

  updateUnreadCount(unreadCount: number): void {
    this.unreadCount$$.next(unreadCount);
  }

  toggleChatWindow() {
    this.isChatWindowOpened = !this.isChatWindowOpened;
    this.chatIconName$$.next(this.isChatWindowOpened ? ChatButtonState.Expand : ChatButtonState.Collapse);
    this._chatWindowStateChangeEvent$$.next(this.isChatWindowOpened);
  }
}
