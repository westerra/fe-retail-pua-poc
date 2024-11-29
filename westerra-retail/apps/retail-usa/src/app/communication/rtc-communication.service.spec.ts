import { take } from 'rxjs/operators';
import { RtcCommunicationService } from './rtc-communication.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RtcCommunicationService', () => {
  let service: RtcCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
    });
    service = TestBed.inject(RtcCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the default value', async () => {
    service.unreadCount$.pipe(take(1)).subscribe((count) => expect(count).toEqual(0));
  });

  it('should emit unread count value as 9', async () => {
    const unreadCount = 9;
    service.updateUnreadCount(unreadCount);
    service.unreadCount$.subscribe((count) => expect(count).toBe(unreadCount));
  });

  it('should open the chat window to start conversation', async () => {
    service.toggleChatWindow();
    service.chatWindowStateChangeEvent$.pipe(take(1)).subscribe((flag) => expect(flag).toBeTrue());
    service.toggleChatWindow();
    service.chatWindowStateChangeEvent$.pipe(take(1)).subscribe((flag) => expect(flag).toBeFalsy());
  });
});
