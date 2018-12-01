import React from 'react';
import getLanguages from '../../api/languages/methods';

class LanguageToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: []
    };
  }

  componentDidMount() {
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
