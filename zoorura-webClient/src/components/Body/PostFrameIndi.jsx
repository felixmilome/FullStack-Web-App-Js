import  PostFrame from "./PostFrame"

export const PostFrameIndi=({diary, diaryId, setDiaryId, params })=> {
  return (
    <div>
        <PostFrame diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId} params={params} />
    </div>
  )
}

export default PostFrameIndi