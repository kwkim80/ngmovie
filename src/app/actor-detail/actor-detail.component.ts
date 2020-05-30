import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'
import {ActorsService} from '../actors.service'
import { IActor } from '../actor';
import { IMovie } from '../movie';
import { inherits } from 'util';
import { IMovieSub } from '../movieSub';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {
  public actorId;
  public actor:IActor;
  private data;
  private actors:IActor[];
  public errorMsg;
  public knownFor:IMovie[];
  public actorName;
  public searchedActor:IActor;
  public hasData=false;
  public castes:IMovieSub[];
  public crews:IMovieSub[];

  constructor(private router:Router, private route:ActivatedRoute, private actorService:ActorsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id=parseInt(params.get('id'));
      let name=params.get('id').split('-')[1];
      this.actorId=id;
      this.actorName=name;
      //console.log(this.actorId+"-"+this.actorName);

      this.actorService.getActor(this.actorId).subscribe(data=>{this.actor=data;this.actorName=this.actor.name;},
        error=>this.errorMsg=error);
  
    
      // this.actorService.getActorbyName(this.actorName).subscribe(data=>{this.actors=data.results;
      //   this.searchedActor=this.actors.find(r=>r.id===this.actorId);
      //   this.knownFor=this.searchedActor.known_for;},
      //   error=>this.errorMsg=error);

      // this.actorService.getActorSub(this.actorId,"combined_credits").subscribe(data=>{
      //     this.data=data;this.castes=this.data.cast  ;this.crews=this.data.crew;
      //     console.log(this.data);
      // }, error=>this.errorMsg=error)

      this.actorService.getActorSub(this.actorId,"combined_credits").subscribe(data=>{
        this.data=data;
        this.castes=this.data.cast.sort((a:IMovieSub, b:IMovieSub) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        this.crews=this.data.crew.sort((a:IMovieSub, b:IMovieSub) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        // this.knownFor=this.data.cast.sort((a:IMovieSub, b:IMovieSub) =>
        // b <.r a.popularity ? -1 : 1);
        console.log(this.castes);
    }, error=>this.errorMsg=error)

     

    });

    
  }

}