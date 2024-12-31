"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
// import { Input } from "../ui/input";

interface Comment {
  id: string;
  author: string;
  text: string;
}

interface CommentSectionProps {
  postId: string;
}

export default function Comments({}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleAddComment = () => {
    if (newComment.trim() && authorName.trim()) {
      const newCommentObj: Comment = {
        id: new Date().toISOString(),
        author: authorName,
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
      setAuthorName("");
    }
  };

  const handleEditComment = (commentID: string) => {
    const commentToEdit = comments.find((comment) => comment.id === commentID);
    if (commentToEdit) {
      setNewComment(commentToEdit.text);
      setAuthorName(commentToEdit.author);
      setEditingCommentId(commentID);
    }
  };

  const handleSaveEditedComment = () => {
    if (newComment.trim() && authorName.trim() && editingCommentId) {
      const updatedComments = comments.map((comment) =>
        comment.id === editingCommentId
          ? { ...comment, text: newComment, author: authorName }
          : comment
      );
      setComments(updatedComments);
      setNewComment("");
      setAuthorName("");
      setEditingCommentId(null);
    }
  };

  return (
    <div className="my-14">
      <h2 className="text-2xl font-semibold">Comments</h2>

      <div className="my-6 space-y-4 w-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="font-semibold uppercase">{comment.author}</div>
                <p className="my-2 font-light line-clamp-2">{comment.text}</p>
                <Button
                  onClick={() => handleEditComment(comment.id)}
                  className="mt-2 "
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="mb-4">No Comments Yet</p>
        )}
      </div>

      <div className="grid grid-cols-1 w-2/3 gap-2">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          className=" mb-2 border rounded-md p-3"
        />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className=" mb-2 border rounded-md p-3"
        />
        <Button
          onClick={
            editingCommentId ? handleSaveEditedComment : handleAddComment
          }
          className="mt-4"
          disabled={!newComment.trim() || !authorName.trim()}
        >
          {editingCommentId ? "Save" : "Submit"}
        </Button>
      </div>
    </div>
  );
}
