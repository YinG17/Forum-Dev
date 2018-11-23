import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { imgSrcUrl } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-emote-menu',
  templateUrl: './emote-menu.component.html',
  styleUrls: ['./emote-menu.component.scss']
})
export class EmoteMenuComponent implements OnInit {
  emotes = [
    { img: imgSrcUrl + 'emote-alien.png', code: ':alien:' },
    { img: imgSrcUrl + 'emote-angel.png', code: ':angel:' },
    { img: imgSrcUrl + 'emote-angry1.png', code: ':angry1:' },
    { img: imgSrcUrl + 'emote-angry2.png', code: ':angry2:' },
    { img: imgSrcUrl + 'emote-angry3.png', code: ':angry3:' },
    { img: imgSrcUrl + 'emote-calm.png', code: ':calm:' },
    { img: imgSrcUrl + 'emote-cool.png', code: ':cool1:' },
    { img: imgSrcUrl + 'emote-cowboy.png', code: ':cowboy:' },
    { img: imgSrcUrl + 'emote-crazy.png', code: ':crazy:' },
    { img: imgSrcUrl + 'emote-crying.png', code: ':crying:' },
    { img: imgSrcUrl + 'emote-curse.png', code: ':curse:' },
    { img: imgSrcUrl + 'emote-dead.png', code: ':dead:' },
    { img: imgSrcUrl + 'emote-devil.png', code: ':devil:' },
    {
      img: imgSrcUrl + 'emote-disappointed.png',
      code: ':disappointed:'
    },
    {
      img: imgSrcUrl + 'emote-embarrassed.png',
      code: ':embarrassed:'
    },
    { img: imgSrcUrl + 'emote-happy1.png', code: ':happy1:' },
    { img: imgSrcUrl + 'emote-happy2.png', code: ':happy2:' },
    { img: imgSrcUrl + 'emote-happy3.png', code: ':happy3:' },
    { img: imgSrcUrl + 'emote-in-love.png', code: ':inlove:' },
    { img: imgSrcUrl + 'emote-injured.png', code: ':injured:' },
    { img: imgSrcUrl + 'emote-kiss.png', code: ':kiss:' },
    { img: imgSrcUrl + 'emote-laughing.png', code: ':laughing:' },
    { img: imgSrcUrl + 'emote-nerd.png', code: ':nerd:' },
    { img: imgSrcUrl + 'emote-rich.png', code: ':rich:' },
    { img: imgSrcUrl + 'emote-robot.png', code: ':robot:' },
    { img: imgSrcUrl + 'emote-sad1.png', code: ':sad1:' },
    { img: imgSrcUrl + 'emote-sad2.png', code: ':sad2:' },
    { img: imgSrcUrl + 'emote-secret.png', code: ':secret:' },
    { img: imgSrcUrl + 'emote-shh.png', code: ':shh:' },
    { img: imgSrcUrl + 'emote-shocked1.png', code: ':shocked1:' },
    { img: imgSrcUrl + 'emote-shocked2.png', code: ':shocked2:' },
    { img: imgSrcUrl + 'emote-sick1.png', code: ':sick1:' },
    { img: imgSrcUrl + 'emote-sick2.png', code: ':sick2:' },
    { img: imgSrcUrl + 'emote-skull.png', code: ':skull:' },
    { img: imgSrcUrl + 'emote-sleeping.png', code: ':sleeping:' },
    { img: imgSrcUrl + 'emote-smile1.png', code: ':smile1:' },
    { img: imgSrcUrl + 'emote-smile2.png', code: ':smile2:' },
    { img: imgSrcUrl + 'emote-smirk.png', code: ':smirk:' },
    { img: imgSrcUrl + 'emote-surprised1.png', code: ':surprised1:' },
    { img: imgSrcUrl + 'emote-surprised2.png', code: ':surprised2:' },
    { img: imgSrcUrl + 'emote-thinking1.png', code: ':thinking1:' },
    { img: imgSrcUrl + 'emote-thinking2.png', code: ':thinking2:' },
    { img: imgSrcUrl + 'emote-tongue1.png', code: ':tongue1:' },
    { img: imgSrcUrl + 'emote-tongue2.png', code: ':tongue2:' },
    { img: imgSrcUrl + 'emote-wink.png', code: ':wink1:' }
  ];

  @Output() addEmote = new EventEmitter<Event>();

  constructor() {}

  ngOnInit() {}

  push(e) {
    e = ' ' + e + ' ';
    this.addEmote.emit(e);
  }
}
