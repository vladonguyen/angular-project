import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },

    {
        path: 'users/:userId', // <your-domain>/tasks
        component: UserTasksComponent,
    }
]