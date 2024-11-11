import { ɵNoopAnimationDriver, AnimationDriver, ɵWebAnimationsDriver } from '@angular/animations/browser';
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
  driver: ɵNoopAnimationDriver | ɵWebAnimationsDriver;
  private _animation = true;
  constructor(public mediaMatcher: MediaMatcher, @Optional() config?: Configurations) {
    if (config) {
      this._animation = config.animation;
    }
    this.matcher = this.mediaMatcher.matchMedia('(prefers-reduced-motion: reduce)');
    this.matcher.addEventListener('change', (event: MediaQueryEvent) => {
      this.reducedMotionListener(event);
    });
    this.driver = !this._animation || this.matcher.matches ? new ɵNoopAnimationDriver() : new ɵWebAnimationsDriver();
  }

  ngOnDestroy() {
    this.matcher.removeEventListener('change', (event: MediaQueryEvent) => {
      this.reducedMotionListener(event);
    });
  }

  reducedMotionListener(event: MediaQueryEvent) {
    this.driver = !this._animation || event.matches ? new ɵNoopAnimationDriver() : new ɵWebAnimationsDriver();
  }

  validateStyleProperty() {
    return this.driver.validateStyleProperty.apply(this.driver, <any>arguments);
  }
  matchesElement() {
    return this.driver.matchesElement.apply(this.driver, <any>arguments);
  }
  containsElement() {
    return this.driver.containsElement.apply(this.driver, <any>arguments);
  }
  query() {
    return this.driver.query.apply(this.driver, <any>arguments);
  }
  computeStyle() {
    return this.driver.computeStyle.apply(this.driver, <any>arguments);
  }
  animate() {
    return this.driver.animate.apply(this.driver, <any>arguments);
  }
}
