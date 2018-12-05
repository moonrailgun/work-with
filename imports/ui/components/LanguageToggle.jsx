import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import getLanguages from '../../api/languages/methods';

window.__ = TAPi18n.__; // 全局翻译方法

class LanguageToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: []
    };
  }

  componentDidMount() {
    TAPi18n.setLanguage('zh');
    getLanguages.call((error, languages) => {
      if (!error) {
        this.setState({
          languages,
        });
      }
    });
  }

  setLocale(event, language) {
    event.preventDefault();
    if (language) {
      i18n.setLocale(language);
    }
  }

  renderLanguages() {
    return this.state.languages.map((language) => {
      let content;
      if (language === this.state.locale) {
        content = (
          <span key={language} className="language active">{language}</span>
        );
      } else {
        content = (
          <a
            key={language}
            href="#toggle-language"
            className="language"
            onClick={event => this.setLocale(event, language)}
          >
            {language}
          </a>
        );
      }
      return content;
    });
  }

  render() {
    return (
      <div className="language-toggle">
        {this.renderLanguages()}
      </div>
    );
  }
}

export default LanguageToggle;
