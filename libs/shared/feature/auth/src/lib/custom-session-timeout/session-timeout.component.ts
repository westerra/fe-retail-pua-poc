import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Countdown, SessionTimeoutTimeFormat } from './session-timeout.interface';
import { CustomSessionTimeoutService } from './session-timeout.service';

/**
 * CustomSessionTimeoutComponent performs basic session logout and management.
 *
 * @deprecated `bb-session-timeout-modal` is deprecated and will be removed in 2023.9 release.
 * Please use `bb-activity-monitor` instead.
 */
@Component({
  selector: 'bb-session-timeout-modal',
  templateUrl: './session-timeout.component.html',
  providers: [CustomSessionTimeoutService],
})
export class CustomSessionTimeoutComponent implements OnInit {
  /**
   * The time before session expiry that the modal should appear.
   * Defaults to `300` (seconds)
   */
  @Input() maxInactivityDuration = 3600;
  /**
   * Duration of countdown.
   * Default value is 60 seconds.
   */
  @Input() countdownDuration = 60;

  /**
   * The options for the modal
   */
  readonly modalOptions: NgbModalOptions = {
    keyboard: false,
    backdrop: 'static',
    windowClass: 'session-timeout__modal',
    backdropClass: 'session-timeout__modal',
  };

  /**
   * Determines whether the modal is open.
   */
  isOpen = false;
  /**
   * The `SessionTimeoutTimeFormat` time format for the current remaining session time.
   */
  timeFormat: SessionTimeoutTimeFormat | undefined;
  /**
   * The `SessionTimeoutTimeFormat` options list.
   */
  formats = SessionTimeoutTimeFormat;
  /**
   * The amount of minutes remaining in the session.
   */
  minutesRemaining: number | undefined;
  /**
   * The amount of seconds remaining in the session.
   */
  secondsRemaining: number | undefined;

  /**
   * CustomSessionTimeoutComponent constructor
   * @param sessionTimeoutService Factory that allows calls to web sdk endpoints for controlling session
   * @param cd Change Detector Ref factory
   * @param ngZone Service for executing work inside or outside of the Angular zone
   */
  constructor(
    private readonly sessionTimeoutService: CustomSessionTimeoutService,
    private readonly cd: ChangeDetectorRef,
    private readonly ngZone: NgZone,
  ) {}

  /**
   * @internal (undocumented)
   */
  ngOnInit(): void {
    this.isOpen = false;
    const countdown: Countdown = {
      maxInactivityDuration: this.maxInactivityDuration,
      countdownDuration: this.countdownDuration,
      start: this.onStart,
      end: this.onEnd,
      reset: this.onReset,
      tick: this.onTick,
    };
    this.sessionTimeoutService.registerCountdown(countdown);
  }

  /**
   * Calls the Session Timeout Service to log the user out.
   * Once Logged out sends the user to the login page.
   * @returns a promise from the session timeout service
   */
  logout() {
    return this.sessionTimeoutService.logout();
  }

  private readonly onStart = () => {
    this.ngZone.run(() => {
      this.isOpen = true;
      this.cd.markForCheck();
    });
  };

  private readonly onEnd = () => {
    this.closeModal();
    return this.logout();
  };

  private readonly onReset = () => {
    this.closeModal();
  };

  private readonly onTick = (ttl: number) => {
    this.ngZone.run(() => {
      if (ttl < 60) {
        this.timeFormat = SessionTimeoutTimeFormat.Seconds;
        this.minutesRemaining = 0;
        this.secondsRemaining = ttl;
      } else if (ttl % 60 === 0) {
        this.timeFormat = SessionTimeoutTimeFormat.Minutes;
        this.minutesRemaining = ttl / 60;
        this.secondsRemaining = 0;
      } else {
        this.timeFormat = SessionTimeoutTimeFormat.Full;
        this.minutesRemaining = Math.floor(ttl / 60);
        this.secondsRemaining = ttl - this.minutesRemaining * 60;
      }
      this.cd.markForCheck();
    });
  };

  private closeModal() {
    this.ngZone.run(() => {
      this.timeFormat = undefined;
      this.minutesRemaining = undefined;
      this.secondsRemaining = undefined;
      this.isOpen = false;
      this.cd.markForCheck();
    });
  }
}
