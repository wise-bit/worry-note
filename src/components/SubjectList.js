import { Link } from 'react-router-dom';

export default function SubjectList(props) {
  const user = props?.users?.find((user) => user.email === props.current);

  const getAllSubjects = () => {
    const subjects = [];
    if (user && user.notes) {
      let i = 0;
      let index = 1;
      while (i < user.notes.length) {
        if (user.notes[i].subject) {
          subjects.push(index + '. ' + user.notes[i].subject);
          index++;
        }
        i++;
      }
    }
    return subjects;
  };

  const getSubjectList = () => {
    const subjectList = getAllSubjects();
    const len = subjectList.length;
    let list = [];
    switch (len) {
      case 0:
        list = ['No subjects available, try creating a note!'];
        break;
      default:
        list = subjectList;
    }
    return list;
  };

  return (
    <>
      {user ? (
        <div style={{ width: '500px' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <Link to={'/home'}>
              <button>Home</button>
            </Link>
          </div>

          <div style={{ textAlign: 'left', fontSize: '16px' }}>
            <div>
              <h1 className='subject-list-header'>Subjects</h1>
            </div>

            {(function (rows, i, subjects) {
              do {
                rows.push(
                  <div key={i} style={{ margin: '10px', marginLeft: '0px' }}>
                    {subjects[i]}
                  </div>
                );
              } while (subjects[++i]);
              return rows;
            })([], 0, getSubjectList())}
          </div>
        </div>
      ) : (
        <Link to={'/login'}>Please log in first before viewing this page!</Link>
      )}
    </>
  );
}
