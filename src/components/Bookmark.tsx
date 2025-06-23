import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
function BookmarkButton({ jid }: { jid: string | undefined }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const GET_IS_BOOKMARK = gql`
    query ($jid: ID!) {
      isBookmarked(jid: $jid)
    }
  `;
  const { data, loading: bookmarkGetLoading } = useQuery(GET_IS_BOOKMARK, {
    variables: { jid: jid },
  });

  const ADD_BOOKMARK = gql`
    mutation ($jid: ID!) {
      addBookmark(jid: $jid) {
        title
        company {
          name
        }
      }
    }
  `;

  const REMOVE_BOOKMARK = gql`
    mutation ($jid: ID!) {
      removeBookmark(jid: $jid) {
        title
        company {
          name
        }
      }
    }
  `;
  const [
    add_bookmark,
    { loading: addBookMarkLoading, error: addBookmarkError },
  ] = useMutation(ADD_BOOKMARK);
  const [
    remove_bookmark,
    { loading: removeBookMarkLoading, error: removeBookmarkError },
  ] = useMutation(REMOVE_BOOKMARK);
  const addBookmark = async () => {
    let res;
    try {
      res = await add_bookmark({ variables: { jid: jid } });
      setIsBookmarked(true);
      toast.success(
        `Bookmarked ${res.data.addBookmark.title} from ${res.data.addBookmark.company.name}`
      );
    } catch {
      toast.error(
        addBookmarkError?.graphQLErrors[0]?.message || "Undefined Error"
      );
    }
  };
  const removeBookmark = async () => {
    try {
      await remove_bookmark({ variables: { jid: jid } });
      setIsBookmarked(false);
      toast.success(`Bookmark remove`);
    } catch {
      toast.error(
        removeBookmarkError?.graphQLErrors[0]?.message || "Undefined Error"
      );
    }
  };
  useEffect(() => {
    setIsBookmarked(data?.isBookmarked || false);
  }, [data]);
  console.log(isBookmarked);

  return (
    <button
      onClick={isBookmarked ? removeBookmark : addBookmark}
      disabled={
        addBookMarkLoading || bookmarkGetLoading || removeBookMarkLoading
      }
      className={`flex items-center justify-center py-3 px-4 border-2 rounded-lg transition duration-300 ${
        isBookmarked
          ? "bg-teal-ocean border-teal-ocean text-white"
          : "border-teal-ocean text-teal-ocean hover:bg-teal-ocean hover:text-white"
      }`}
    >
      <Bookmark
        className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
      />
      Save
    </button>
  );
}

export default BookmarkButton;
