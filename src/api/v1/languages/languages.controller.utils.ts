import { ILanguage } from './languages.types';

export const pickPropsFromBody = (body: Partial<ILanguage>): Partial<ILanguage> => {
  const { title, code } = body;
  const props: Partial<ILanguage> = {};

  if (title) {
    props.title = title;
  }

  if (code) {
    props.code = code;
  }

  return props;
};
