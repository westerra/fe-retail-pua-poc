/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimationDriver, NoopAnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, OnDestroy, Optional } from '@angular/core';
import { Configurations } from './api/configurations';

interface MediaQueryEvent {
  readonly matches: boolean;
  readonly media: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppAnimationDriver implements AnimationDriver, OnDestroy {
  matcher!: MediaQueryList;
  driver: AnimationDriver;
  private _animation = true;

  constructor(public mediaMatcher: MediaMatcher, @Optional() config?: Configurations) {
    if (config) {
      this._animation = config.animation;
    }

    // Check media query for reduced motion
    this.matcher = this.mediaMatcher.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Listen for changes in the media query
    this.matcher.addEventListener('change', (event: MediaQueryEvent) => {
      this.reducedMotionListener(event);
    });

    // Initialize animation driver based on reduced motion preference
    this.driver = !this._animation || this.matcher.matches ? new NoopAnimationDriver() : new ɵWebAnimationsDriver();
  }

  ngOnDestroy() {
    // Cleanup event listener
    this.matcher.removeEventListener('change', (event: MediaQueryEvent) => {
      this.reducedMotionListener(event);
    });
  }

  reducedMotionListener(event: MediaQueryEvent) {
    // Switch driver based on reduced motion preference
    this.driver = !this._animation || event.matches ? new NoopAnimationDriver() : new ɵWebAnimationsDriver();
  }

  validateStyleProperty() {
    // Forward the call to the driver
    return this.driver.validateStyleProperty.apply(this.driver, arguments as any);
  }

  matchesElement() {
    // Forward the call to the driver
    return this.driver.matchesElement.apply(this.driver, arguments as any);
  }

  containsElement() {
    // Forward the call to the driver
    return this.driver.containsElement.apply(this.driver, arguments as any);
  }

  query() {
    // Forward the call to the driver
    return this.driver.query.apply(this.driver, arguments as any);
  }

  computeStyle() {
    // Forward the call to the driver
    return this.driver.computeStyle.apply(this.driver, arguments as any);
  }

  animate() {
    // Forward the call to the driver
    return this.driver.animate.apply(this.driver, arguments as any);
  }

  /**
   * Implementing `getParentElement` method required by the `AnimationDriver` interface.
   */
  getParentElement(element: any): Promise<any> {
    return Promise.resolve(element.parentElement);
  }
}
