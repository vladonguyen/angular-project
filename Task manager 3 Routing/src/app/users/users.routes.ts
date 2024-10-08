import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { NotFoundComponent } from "../not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },

    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]