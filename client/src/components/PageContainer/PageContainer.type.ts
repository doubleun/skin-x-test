export interface PageContainerProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactElement
}
