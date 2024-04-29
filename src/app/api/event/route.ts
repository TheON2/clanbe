import mongoose from "mongoose";
import { EventType } from "../../../../types/types";
import EventModel from "@/models/event";

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    const events = await EventModel.find({});

    const formattedEvents = events.map((event) => ({
      id: event._id.toString(), // MongoDB _id field to id
      title: event.title,
      date: event.date,
      description: event.description,
      author: event.author,
    }));

    return new Response(
      JSON.stringify({ events:formattedEvents }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json' // JSON 반환 타입 명시
        }
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      new Response(JSON.stringify({ error: "An unknown error occurred" }), {
        status: 500,
      });
    }
  }
}
