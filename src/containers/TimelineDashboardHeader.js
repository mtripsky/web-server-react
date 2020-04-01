import React from 'react';

class TimelineDashboardHeader extends React.Component {
  render() {
    return (
      <div>
        {["1 day","3 days", "1 week", "2 weeks", "1 month", "2 months", "1 year"]
          .map((text) => (
            <button>
              {text}
            </button>
        ))}
      </div>
    )
  };
}

export default TimelineDashboardHeader;