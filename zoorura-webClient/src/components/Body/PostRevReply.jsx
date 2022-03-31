import { PostFrameRevRow } from "./PostFrameRevRow";

export const PostRevReply = ({diaryId, diaryCreator, userId, reviewer}) => {
  return (
    <>
    <PostFrameRevRow diaryId={diaryId} diaryCreator={diaryCreator} userId= {userId} reviewer= {reviewer}/>
    </>
  )
}

