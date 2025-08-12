import { checkKeyword } from "@/actions/checkKeyword";
import { notFound, redirect } from "next/navigation";

const Page = async ({ params }) => {
  const title = params.title.replace(/-/g, " ");

  const keywordDetails = await checkKeyword(title);

  const type = keywordDetails?.type;
  const parentCategory = keywordDetails?.parentCategory;

  if (!keywordDetails || !type) {
    // return redirect("/abs");
    return notFound();
  }

  switch (type) {
    case "category":
      return redirect(`/${params.title}/collection/all`);

    case "subcategory":
      return redirect(`/${params.title}/subcollection/${parentCategory}`);

    case "room":
      return redirect(`/${params.title}/rooms`);

    case "suggestion":
      return redirect(`/${params.title}/inspiration`);

    default:
      break;
  }

  // return redirect(`/${params.title}/collection/all`);
};

export default Page;
