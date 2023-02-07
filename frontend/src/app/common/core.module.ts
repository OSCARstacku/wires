import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GlobalService } from "./services/global.service";

@NgModule({
    imports: [CommonModule],
    providers: [GlobalService],
})
export class CoreModule {}