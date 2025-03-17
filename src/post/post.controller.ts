import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('createPost')
  create(@Payload() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @MessagePattern('findAllPost')
  findAll() {
    return this.postService.findAll();
  }

  @MessagePattern('findOnePost')
  findOne(@Payload() id: string) {
    return this.postService.findOne(id);
  }

  @MessagePattern('updatePost')
  update(
    @Payload()
    { id, updatePostDto }: { id: string; updatePostDto: UpdatePostDto },
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @MessagePattern('removePost')
  remove(@Payload() id: string) {
    return this.postService.remove(id);
  }
}
