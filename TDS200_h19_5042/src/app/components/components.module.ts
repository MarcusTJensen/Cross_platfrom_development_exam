import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { TabbarComponent } from './tabbar/tabbar.component';

@NgModule({
    imports: [IonicModule],
    declarations: [TabbarComponent],
    exports: [TabbarComponent]
})
export class ComponentsModule {}