import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | IdeaVault`;
  }, [title]);
};

export default useTitle;