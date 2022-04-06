import { Controller, Get, Query, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsInt } from 'class-validator';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {


    throw new Error("wow")
    await this.foo();

    return this.appService.getHello();
  }

  private async foo () {

    await this.delay(1000);
    console.log("foo")
    this.bar();
  }

  private async bar () {
    await this.delay(10000);
    console.log("bar")
  }

  private delay(t: number) {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        resolve(null);
      }, t);
    })
  }
}
