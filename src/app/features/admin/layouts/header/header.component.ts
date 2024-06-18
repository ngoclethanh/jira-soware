import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent implements OnInit {
  constructor(private service: NotificationService) {}
  socialLink = [
    {
      name: '🍺 Support',
      link:''
    },
    {
      name: '🎧 Spotify ',
       link:''
    },
    {
      name: ' 🎮 Tetris ',
       link:''
    },
    {
      name: ' 📕 Storybook  ',
       link:''
    },
    {
      name: '🎧 Spotify ',
       link:''
    },
    {
      name: 'Tweet ',
       link:''
    },
    {
      name: ' Source code ',
       link:''
    },
  ];

  title: any = {};
  ngOnInit(): void {
    this.service.received().subscribe((data) => {
      this.title = data[data.length - 1];
    });
  }
}
