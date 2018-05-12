import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-route',
  templateUrl: './explore-route.component.html',
  styleUrls: ['./explore-route.component.css']
})
export class ExploreRouteComponent implements OnInit {

  constructor(protected router: Router) { }

  public ngOnInit() {
    this.router.navigateByUrl('/chris-ramsay');
  }

}
