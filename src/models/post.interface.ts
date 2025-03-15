import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String })
  _id?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: [] })
  tags?: string[];

  @Prop({ default: false })
  published?: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
