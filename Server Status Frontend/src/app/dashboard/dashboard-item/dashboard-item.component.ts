import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css'
})
export class DashboardItemComponent {
  //standard and newer way to have inputs
// @Input({required: true}) image!: { src: string; alt: string};
// @Input({required: true}) title!: string;
image = input.required<{ src: string; alt: string}>();
title = input.required<string>();
}
