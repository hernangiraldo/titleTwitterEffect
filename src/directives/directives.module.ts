import { NgModule } from '@angular/core';
import { HeaderTitleDirective } from './header-title/header-title';
import { AnimationProfileDirective } from './animation-profile/animation-profile';

@NgModule({
	declarations: [
		HeaderTitleDirective,
		AnimationProfileDirective
	],
	imports: [],
	exports: [
		HeaderTitleDirective,
		AnimationProfileDirective
	]
})
export class DirectivesModule { }
