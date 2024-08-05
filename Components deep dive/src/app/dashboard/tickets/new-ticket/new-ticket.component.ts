import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  @ViewChild('form') form?: ElementRef<HTMLFormElement> 

  add= output<{title:string; text: string}>();

    onSubmit(title: string, ticketText: string){
    this.add.emit({title:title, text: ticketText})
      this.form?.nativeElement.reset();
    }

}
