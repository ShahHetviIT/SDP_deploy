import React from "react";

export default function StudentProfile({ currentStudent }) {
    console.log(currentStudent);

    const calculateYearsFromEnrollment = (enrollmentYear) => {
        const currentYear = new Date().getFullYear();
        return currentYear - enrollmentYear;
    };
    const calculateCurrentSemester = (enrollmentYear) => {
        const currentYear = new Date().getFullYear();
        const yearsSinceEnrollment = currentYear - enrollmentYear;
        // Each year contains 2 semesters
        const totalSemesters = yearsSinceEnrollment * 2;
        const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
        
        // Assuming each semester starts in June and December
        if (currentMonth >= 6 && currentMonth <= 12) {
            return totalSemesters  - 1; // For odd semesters (June to December)
        } else {
            return totalSemesters; // For even semesters (December to June)
        }
    };
    return (
        <>
            <h3>STUDENT PROFILE</h3>
            <table>
                <tbody>
                    <tr className="tableRow">
                        <td>ADMISSION TYPE</td>
                        <td>{currentStudent.AdmissionType}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>FIRST NAME</td>
                        <td>{currentStudent.FirstName}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>MIDDLE NAME</td>
                        <td>{currentStudent.MiddleName}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>LAST NAME</td>
                        <td>{currentStudent.LastName}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>FULL NAME</td>
                        <td>{`${currentStudent.FirstName} ${currentStudent.MiddleName} ${currentStudent.LastName}`}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>GENDER</td>
                        <td>{currentStudent.Gender}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>BIRTH DATE</td>
                        <td>{currentStudent.BirthDate}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>BIRTH PLACE</td>
                        <td>{currentStudent.BirthPlace}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>IS D2D</td>
                        <td>{currentStudent.IsD2D ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>ENROLLMENT YEAR</td>
                        <td>{currentStudent.EnrollmentYear}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>DEGREE</td>
                        <td>{currentStudent.Degree}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>SESSION NO</td>
                        <td>{calculateYearsFromEnrollment(currentStudent.EnrollmentYear)}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>SEMESTER</td>
                        <td>{calculateCurrentSemester(currentStudent.EnrollmentYear)}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>BATCH YEAR</td>
                        <td>{currentStudent.EnrollmentYear}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>STUDENT CODE</td>
                        <td>{currentStudent.StudentCode}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>CAST CATEGORY CODE</td>
                        <td>{currentStudent.CastCategoryCode}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>SUB CAST</td>
                        <td>{currentStudent.SubCast}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>MARITAL STATUS</td>
                        <td>{currentStudent.MeritalStatus}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>MOTHER TONGUE</td>
                        <td>{currentStudent.MotherTongue}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>NATIONALITY</td>
                        <td>{currentStudent.Nationality}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>BLOOD GROUP</td>
                        <td>{currentStudent.BloodGroup}</td>
                    </tr>
                </tbody>
            </table>

            <div className="line"></div>

            <h3>GUARDIAN INFORMATION</h3>

            <table>
                <tbody>
                    <tr className="tableRow">
                        <td>RELATION TYPE</td>
                        <td>{currentStudent.RelationType}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>FULL NAME</td>
                        <td>{currentStudent.FullName}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>OCCUPATION</td>
                        <td>{currentStudent.Occupation}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>ORGANIZATION NAME</td>
                        <td>{currentStudent.OrganizationName}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>ANNUAL INCOME</td>
                        <td>{currentStudent.AnnualIncome}</td>
                    </tr>
                </tbody>

                
            </table>
            <div className="line"></div>

            <h3>CONTACT INFORMATION</h3>
            <table>
                <tbody>
                <tr className="tableRow">
                        <td>ADDRESS1</td>
                        <td>{currentStudent.Address1}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>ADDRESS2	</td>
                        <td>{currentStudent.Address2}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>ADDRESS3</td>
                        <td>{currentStudent.Address3}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>CITY</td>
                        <td>{currentStudent.City}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>PIN CODE</td>
                        <td>{currentStudent.Pincode}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>STATE</td>
                        <td>{currentStudent.State}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>COUNTRY</td>
                        <td>{currentStudent.Country}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>PHONE NO</td>
                        <td>{currentStudent.PhoneNo}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>MOBILE NO	</td>
                        <td>{currentStudent.MobileNo}</td>
                    </tr>
                    <tr className="tableRow">
                        <td>EMAIL</td>
                        <td>{currentStudent.Email}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
