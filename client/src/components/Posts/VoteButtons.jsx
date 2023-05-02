import React from "react";

export const UpVoteButton = ({ user, body, handleUpVote, size }) => {
  return (
    <Checkbox
      checked={body.upvotedBy.includes(user.id)}
      icon={<ArrowUpwardIcon style={{ color: "#b2b2b2" }} />}
      checkedIcon={<ArrowUpwardIcon style={{ color: "#FF8b60" }} />}
      onChange={handleUpvote}
      size={size || "small"}
    />
  );
};
