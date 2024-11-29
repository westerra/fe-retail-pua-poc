import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtcChatButtonComponent } from './rtc-chat-button.component';
import { RtcCommunicationService } from '../../communication/rtc-communication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IconModule } from '@backbase/ui-ang/icon';
import { BadgeCounterModule } from '@backbase/ui-ang/badge-counter';

describe('RtcChatButtonComponent', () => {
  let component: RtcChatButtonComponent;
  let service: RtcCommunicationService;
  let fixture: ComponentFixture<RtcChatButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RtcChatButtonComponent],
      imports: [HttpClientModule, RouterTestingModule, IconModule, BadgeCounterModule],
      providers: [RtcCommunicationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtcChatButtonComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RtcCommunicationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleChatWindow to open chat window', async () => {
    const toggleChatWindowSPy = spyOn(service, 'toggleChatWindow');
    component.toggleChatWindow();
    expect(toggleChatWindowSPy).toHaveBeenCalled();
  });
});
