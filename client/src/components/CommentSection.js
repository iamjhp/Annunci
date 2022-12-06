import { Fragment, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import userService from '../services/user';
import adsService from '../services/ads';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CommentSection = ({ ad }) => {
  const [comments, setComments] = useState(ad?.comments);
  const [comment, setComment] = useState('');
  const user = userService.getUser()?.email;

  const handleClick = (e) => {
    e.preventDefault();
    const toSaveComment = `${user}: ${comment}`;
    adsService.commentAd(ad.id, toSaveComment);
    setComments([...comments].concat(toSaveComment));
    e.target.comment.value = '';
    setComment('');
  };

  return (
    <div className="flex flex-col justify-between">
      <h2>Comments</h2>
      <div className="h-32 overflow-scroll bg-white mb-4">
        <div>
          {comments.map((c, i) => (
            <div key={i}>
              <p>{c}</p>
            </div>
          ))}
        </div>
      </div>
      {user && (
        <div className="flex items-start space-x-4">
          <div className="min-w-0 flex-1">
            <form action="#" className="relative" onSubmit={handleClick}>
              <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  rows={3}
                  name="comment"
                  id="comment"
                  onChange={(e) => setComment(e.target.value)}
                  className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                  placeholder="Add your comment..."
                  defaultValue={''}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div className="py-2" aria-hidden="true">
                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                <div className="flex items-center space-x-5"></div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
