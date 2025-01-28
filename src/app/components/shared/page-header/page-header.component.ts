import { Component, Input } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PageHeaderComponent {
  @Input() title = ""
  @Input() subtitle = ""
}

