import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly PostModel: Model<Post>) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new this.PostModel(createPostDto);
    return newPost.save();
  }

  async findAll(): Promise<Post[] | { message: string }> {
    const postList = await this.PostModel.find().exec();

    if (postList.length === 0) return { message: 'No se encontraron posts' };

    return postList;
  }

  async findOne(id: string): Promise<Post | { message: string }> {
    const post = await this.PostModel.findById(id).exec();

    if (!post) return { message: 'No existe el post' };

    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post | { message: string }> {
    const post = await this.PostModel.findByIdAndUpdate(
      id,
      updatePostDto,
    ).exec();

    if (!post) return { message: 'No existe el post' };

    return post;
  }

  async remove(id: string): Promise<Post | { message: string }> {
    const post = await this.PostModel.findByIdAndDelete(id).exec();

    if (!post) return { message: 'No existe el post' };

    return post;
  }
}
