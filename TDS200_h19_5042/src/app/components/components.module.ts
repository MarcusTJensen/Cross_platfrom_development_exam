import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { TabbarComponent } from './tabbar/tabbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [TabbarComponent],
    exports: [TabbarComponent]
})
export class ComponentsModule {}