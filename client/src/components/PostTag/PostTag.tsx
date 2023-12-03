function PostTag({ children }: React.PropsWithChildren) {
  return (
    <div className="rounded-full py-0.5 px-2 bg-slate-600 text-white text-sm">
      {children}
    </div>
  )
}

export default PostTag
